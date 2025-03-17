import { logger } from "@lib/logger";
import productRequisitionFormRepository from "@repositories/product-requisition-form.repository";
import _ from "lodash";

class ProductRequisitionFormScheduler {
  public initProjectNameToPO() {
    setTimeout(async () => {
      const forms = await productRequisitionFormRepository.find({
        where: { PO: "" },
        relations: ["project"],
      });

      const updatedForms = forms.map((form) => {
        if (form.projectName) {
          form.PO = form.projectName;
        } else {
          form.PO = form.project?.name || "N/A";
        }
        return form;
      });

      if (_.isEmpty(updatedForms)) return;

      await productRequisitionFormRepository.manager.transaction(
        async (manager) => {
          try {
            await manager.save(updatedForms);
            logger.info("Init PO from project name successfully");
            return 1;
          } catch (error) {
            logger.error("Init PO from project name successfully", error);
          }
        }
      );
    }, 5000);
  }
}

export default new ProductRequisitionFormScheduler();
