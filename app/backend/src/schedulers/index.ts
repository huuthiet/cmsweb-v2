import productRequisitionFormScheduler from "./product-requisition-form.scheduler";

const startSchedulers = () => {
  productRequisitionFormScheduler.initProjectNameToPO();
};

export default startSchedulers;
