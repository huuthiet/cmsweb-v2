import { UserApprovalFormResponseDto } from "@dto/response";
import { UserApproval } from "@entities";
import { ErrorCodes, GlobalError } from "@exception";
import { mapper } from "@mappers";
import { userApprovalRepository } from "@repositories";
import {
  TPaginationOptionResponse,
  TGetAllProductRequisitionForms,
} from "@types";
import { parsePagination } from "@utils";
import { FindOptionsWhere } from "typeorm";

class UserApprovalService {
  public async getUserApprovals(
    userId: string,
    options: TGetAllProductRequisitionForms
  ): Promise<TPaginationOptionResponse<UserApprovalFormResponseDto[]>> {
    // Parse and validate pagination parameters
    const { page, pageSize } = parsePagination(options);

    const whereConditions: FindOptionsWhere<UserApproval> = {
      assignedUserApproval: {
        user: {
          id: userId,
        },
      },
    };

    if (options.type) {
      whereConditions.productRequisitionForm = {
        type: options.type,
      };
    }

    const totalApprovalForms = await userApprovalRepository.count({
      where: whereConditions,
    });

    // Calculate pagination details
    const totalPages = Math.ceil(totalApprovalForms / pageSize);

    const approvalForms = await userApprovalRepository.find({
      where: whereConditions,
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: {
        productRequisitionForm: { type: "DESC" },
        createdAt: options.order,
      },
      relations: [
        "assignedUserApproval",
        "productRequisitionForm.project",
        "productRequisitionForm.creator.userDepartments.department.site.company",
        "productRequisitionForm.requestProducts.product.unit",
        "productRequisitionForm.requestProducts.temporaryProduct.unit",
        "productRequisitionForm.userApprovals.assignedUserApproval.user",
        "productRequisitionForm.userApprovals.approvalLogs",
      ],
    });

    const approvalFormsDto: UserApprovalFormResponseDto[] = mapper.mapArray(
      approvalForms,
      UserApproval,
      UserApprovalFormResponseDto
    );

    return {
      items: approvalFormsDto,
      page,
      pageSize,
      totalPages,
    };
  }

  public async getUserApproval(slug: string) {
    const userApproval = await userApprovalRepository.findOne({
      where: {
        slug,
      },
      relations: [
        "assignedUserApproval",
        "productRequisitionForm.project",
        "productRequisitionForm.creator.userDepartments.department.site.company",
        "productRequisitionForm.requestProducts.product.unit",
        "productRequisitionForm.requestProducts.temporaryProduct.unit",
        "productRequisitionForm.userApprovals.assignedUserApproval.user",
        "productRequisitionForm.userApprovals.approvalLogs",
      ],
    });

    if (!userApproval)
      throw new GlobalError(ErrorCodes.USER_APPROVAL_NOT_FOUND);

    return mapper.map(userApproval, UserApproval, UserApprovalFormResponseDto);
  }
}

export default new UserApprovalService();
