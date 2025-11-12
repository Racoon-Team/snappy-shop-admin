import React from 'react'
import { Badge, TableBody, TableCell, TableRow } from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'

import EditDeleteButton from '@/components/table/EditDeleteButton'
import DeleteModal from '../modal/DeleteModal'

import { type Role } from '@/types/Role'

interface RoleTableProps {
  roles: Role[]
  handleUpdate: (id: string) => void
  handleModalOpen: (id: string) => void
}

const RoleTable: React.FC<RoleTableProps> = ({ roles, handleUpdate, handleModalOpen }) => {
  const { t } = useTranslation()

  return (
    <>
      <TableBody>
        {roles?.map((role) => (
          <TableRow key={role.id}>
            <TableCell>
              <span className="text-sm font-medium">{role.name}</span>
            </TableCell>
            <TableCell>
              {role.permissions?.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((perm: string, idx: number) => (
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
                id={role.id}
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
