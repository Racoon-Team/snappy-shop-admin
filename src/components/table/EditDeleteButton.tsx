import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
const Link: any = RouterLink
import { FiEdit, FiTrash2, FiZoomIn } from 'react-icons/fi'

import Tooltip from '@/components/tooltip/Tooltip'

interface EditDeleteButtonProps {
  id: string
  title?: string
  handleUpdate: (id: string) => void
  handleModalOpen: (id: string, title?: string, product?: boolean) => void
  isCheck?: string[]
  product?: boolean
  parent?: { _id: string }
  children?: any[]
}

const EditDeleteButton: React.FC<EditDeleteButtonProps> = ({
  id,
  title,
  handleUpdate,
  handleModalOpen,
  isCheck,
  product,
  parent,
  children,
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex justify-end text-right">
      {(children?.length ?? 0) > 0 ? (
        <>
          <Link
            to={`/categories/${parent?._id}`}
            className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
          >
            <Tooltip id="view" Icon={FiZoomIn} title={t('common.view')} bgColor="#10B981" />
          </Link>

          <button
            disabled={!!isCheck?.length}
            onClick={() => handleUpdate(id)}
            className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
          >
            <Tooltip id="edit" Icon={FiEdit} title={t('common.edit')} bgColor="#10B981" />
          </button>
        </>
      ) : (
        <button
          disabled={!!isCheck?.length}
          onClick={() => handleUpdate(id)}
          className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
        >
          <Tooltip id="edit" Icon={FiEdit} title={t('common.edit')} bgColor="#10B981" />
        </button>
      )}

      <button
        disabled={!!isCheck?.length}
        onClick={() => handleModalOpen(id, title, product)}
        className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
      >
        <Tooltip id="delete" Icon={FiTrash2} title={t('common.delete')} bgColor="#EF4444" />
      </button>
    </div>
  )
}

export default EditDeleteButton
