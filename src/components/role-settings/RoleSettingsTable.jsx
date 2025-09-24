import { Badge, TableBody, TableCell, TableRow } from '@windmill/react-ui'
import React from 'react'
import EditDeleteButton from '@/components/table/EditDeleteButton'
import { useTranslation } from 'react-i18next'
import useToggleDrawer from '@/hooks/useToggleDrawer'
import DeleteModal from '../modal/DeleteModal'

const RoleTable = ({ roles, handleUpdate, handleModalOpen }) => {
  const { t } = useTranslation()
  const { title, serviceId } = useToggleDrawer()

  return (
    <>
      <TableBody>
        {roles?.map((role) => (
          <TableRow key={role._id}>
            <TableCell>
              <span className="text-sm font-medium">{role.name}</span>
            </TableCell>
            <TableCell>
              {role.permissions?.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((perm, idx) => (
                    <Badge key={idx} type="primary">
                      {perm}
                    </Badge>
                  ))}
                </div>
              ) : (
                <Badge type="neutral">{t('roleScreen.noPermissions')}</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <EditDeleteButton
                id={role._id}
                title={role.name}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  )
}

export default RoleTable
