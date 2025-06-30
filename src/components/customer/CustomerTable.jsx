import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import dayjs from "dayjs";
import { t } from "i18next";
import React from "react";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import
import MainDrawer from "@/components/drawer/MainDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import Tooltip from "@/components/tooltip/Tooltip";
import CustomerDrawer from "@/components/drawer/CustomerDrawer";
import EditDeleteButton from "@/components/table/EditDeleteButton";

// internal imports
const CustomerTable = ({ customers }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <DeleteModal id={serviceId} title={title} />

      <MainDrawer>
        <CustomerDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {customers?.map((user) => {
          const hasOrders = user.ordersCount > 0;

          const tooltipProps = {
            id: hasOrders ? `view-${user._id}` : `view-disabled-${user._id}`,
            Icon: FiZoomIn,
            title: hasOrders ? t("ViewOrder") : t("NoOrders"),
            bgColor: hasOrders ? "#34D399" : "#D1D5DB",
          };

          const Wrapper = hasOrders ? Link : "div";
          const wrapperProps = hasOrders
            ? { to: `/customer-order/${user._id}` }
            : {
                style: {
                  opacity: 0.4,
                  pointerEvents: "none",
                  cursor: "not-allowed",
                },
              };

          return (
            <TableRow key={user._id}>
              <TableCell>
                <span className="font-semibold uppercase text-xs">
                  {user?._id?.substring(20, 24)}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {dayjs(user.createdAt).format("MMM D, YYYY")}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{user.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{user.email}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium">{user.phone}</span>
              </TableCell>

              <TableCell>
                <div className="flex justify-end text-right">
                  <div className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                    <Wrapper {...wrapperProps}>
                      <Tooltip {...tooltipProps} />
                    </Wrapper>
                  </div>

                  <EditDeleteButton
                    title={user.name}
                    id={user._id}
                    handleUpdate={handleUpdate}
                    handleModalOpen={handleModalOpen}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};

export default CustomerTable;
