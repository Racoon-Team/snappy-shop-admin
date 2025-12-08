import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@windmill/react-ui'
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { FiMail, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

// internal imports
import ellipse from '@/assets/img/icons/ellipse.svg'
import CheckBox from '@/components/form/input/CheckBox'
import PageTitle from '@/components/Typography/PageTitle'
import useUtilsFunction from '@/hooks/useUtilsFunction'
import NotificationServices from '@/services/NotificationServices'
import { notifyError, notifySuccess } from '@/utils/toast'
import type { Notification, notificationStatusType } from '@/types/notification'

const Notifications: React.FC = () => {
  const [data, setData] = useState<Notification[]>([])
  const [totalDoc, setTotalDoc] = useState<number>(0)
  const [totalUnreadDoc, setTotalUnreadDoc] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [isCheck, setIsCheck] = useState<string[]>([])
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)

  const { showDateTimeFormat } = useUtilsFunction()

  const markNotificationAsReadLocal = (id: string) => {
    setData((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, status: 'read' as notificationStatusType } : notif))
    )
    setTotalUnreadDoc((prev) => prev - 1)
  }

  const handleNotificationStatusChange = async (id: string) => {
    try {
      await NotificationServices.updateStatusNotification(id, { status: 'read' as notificationStatusType })
      markNotificationAsReadLocal(id)
    } catch (err: any) {
      notifyError(err?.response?.data?.message || err?.message)
    }
  }

  const handleNotificationDelete = async (id: string) => {
    try {
      await NotificationServices.deleteNotification(id)
      setData((prev) => prev.filter((notif) => notif.id !== id))
      setTotalDoc((prev) => prev - 1)

      const deletedNotif = data.find((notif) => notif.id === id)
      if (deletedNotif?.status === 'unread') setTotalUnreadDoc((prev) => prev - 1)
    } catch (err: any) {
      notifyError(err?.response?.data?.message || err?.message)
    }
  }

  const handleSeeMoreNotification = async (pg: number) => {
    try {
      const getAllRes = await NotificationServices.getAllNotification(pg)
      setData((prev) => [...prev, ...((getAllRes.data as unknown as Notification[]) || [])])
      setTotalUnreadDoc(getAllRes.additionalInfo?.totalUnread || 0)
      setPage(pg)
    } catch (err: any) {
      notifyError(err?.response?.data?.message || err?.message)
    }
  }

  const handleMarkIsRead = async () => {
    try {
      await NotificationServices.updateManyStatusNotification({ ids: isCheck, status: 'read' })
      setData((prev) => prev.map((notif) => (isCheck.includes(notif.id) ? { ...notif, status: 'read' } : notif)))
      setTotalUnreadDoc((prev) => prev - isCheck.length)
      setIsCheck([])
      notifySuccess('Selected notifications marked as read')
    } catch (err: any) {
      notifyError(err?.response?.data?.message || err?.message)
    }
  }

  const handleDeleteMany = async () => {
    try {
      await NotificationServices.deleteManyNotification({ ids: isCheck })
      setData((prev) => prev.filter((notif) => !isCheck.includes(notif.id)))
      setTotalDoc((prev) => prev - isCheck.length)
      const unreadDeleted = data.filter((notif) => isCheck.includes(notif.id) && notif.status === 'unread').length
      setTotalUnreadDoc((prev) => prev - unreadDeleted)
      setIsCheck([])
      notifySuccess('Selected notifications deleted')
    } catch (err: any) {
      notifyError(err?.response?.data?.message || err?.message)
    }
  }

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll)
    setIsCheck(!isCheckAll ? data.map((li) => li.id) : [])
  }

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    setIsCheck((prev) => (checked ? [...prev, id] : prev.filter((item) => item !== id)))
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await NotificationServices.getAllNotification(1)
        setData((res.data as unknown as Notification[]) || [])
        setTotalUnreadDoc(res.additionalInfo?.totalUnread || 0)
        setTotalDoc(res.total || 0)
        setPage(1)
      } catch (err: any) {
        notifyError(err?.response?.data?.message || err?.message)
      }
    })()
  }, [])

  return (
    <>
      <PageTitle>Notifications</PageTitle>

      <Card className="shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="flex justify-between">
          <Button
            disabled={isCheck.length < 1}
            onClick={handleMarkIsRead}
            className="w-full rounded-md h-10 flex items-center justify-center bg-blue-500 text-white px-1 hover:bg-blue-700"
          >
            <FiMail className="mr-2" /> Mark is read
          </Button>

          <Button
            disabled={isCheck.length < 1}
            onClick={handleDeleteMany}
            className="w-full rounded-md h-10 bg-red-500 btn-red"
          >
            <FiTrash2 className="mr-3" /> Delete
          </Button>
        </CardBody>
      </Card>

      <Card className="shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody style={{ padding: 0 }}>
          <div className="p-4 dark:text-gray-300">
            <p className="text-sm font-semibold text-teal-700">Unread Notification ({totalUnreadDoc})</p>
          </div>

          <div className="border rounded-md">
            <div className="bg-gray-200 border-gray-400 p-2 dark:bg-gray-700 dark:text-gray-400 flex justify-between">
              <div className="flex">
                <CheckBox
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  handleClick={handleSelectAll}
                  isChecked={isCheckAll}
                />
                <p className="text-xs font-semibold text-gray-500 my-auto dark:text-gray-300 ml-6 uppercase">
                  Notification
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold text-gray-500 my-auto dark:text-gray-300 mr-2 uppercase">Action</p>
              </div>
            </div>

            <div className="w-full lg:h-lg md:h-sm h-md relative">
              <Scrollbars className="scrollbar-hide">
                <TableContainer className="border-none p-2">
                  <Table>
                    <TableBody className="w-full h-440">
                      {data.map((value) => (
                        <TableRow className="border-none" key={value.id}>
                          <TableCell style={{ padding: 0 }}>
                            <CheckBox
                              type="checkbox"
                              name={value.id}
                              id={value.id}
                              handleClick={handleClick}
                              isChecked={isCheck.includes(value.id)}
                            />
                          </TableCell>

                          <TableCell className="md:w-full w-1/5" style={{ paddingRight: 0 }}>
                            <Link
                              to={
                                value.productId
                                  ? `/product/${value.productId}`
                                  : value.orderId
                                    ? `/order/${value.orderId}`
                                    : '#'
                              }
                              className="flex items-center"
                              onClick={() => handleNotificationStatusChange(value.id)}
                            >
                              <Avatar
                                className="mr-2 md:block hidden bg-gray-50 border border-gray-200"
                                src={value.image ?? ''}
                                alt="image"
                              />

                              <div className="notification-content">
                                <div className="md:inline-block hidden">
                                  <h6 className="font-medium text-gray-500">{value.message}</h6>
                                </div>
                                <div className="md:hidden">
                                  <h6 className="font-medium text-gray-500">
                                    {value.message.substring(0, 33) + '...'}
                                  </h6>
                                </div>

                                <p className="flex items-center text-xs text-gray-400">
                                  {value.productId ? (
                                    <Badge type="danger">Stock Out</Badge>
                                  ) : (
                                    <Badge type="success">New Order</Badge>
                                  )}
                                  <span className="ml-2">{showDateTimeFormat(value.createdAt)}</span>
                                </p>
                              </div>

                              {value.status === 'unread' && (
                                <span className="px-2 md:flex hidden focus:outline-none text-emerald-600">
                                  <img
                                    src={ellipse}
                                    width={12}
                                    height={12}
                                    alt="ellipse"
                                    className="w-3 h-3 text-emerald-600"
                                  />
                                </span>
                              )}
                            </Link>
                          </TableCell>

                          <TableCell
                            className="text-right"
                            style={{ padding: `${window.innerWidth < 420 ? '0' : '0.5rem'}` }}
                          >
                            <div className="group inline-block relative">
                              <button
                                onClick={() => handleNotificationDelete(value.id)}
                                type="button"
                                className="px-2 group-hover:text-blue-500 text-red-500 focus:outline-none"
                              >
                                <FiTrash2 />
                              </button>

                              <div className="absolute hidden group-hover:inline-block bg-gray-50 dark:text-white mr-8 mb-1 right-0 z-50 px-3 py-2 text-sm font-medium text-red-600 rounded-lg shadow-sm tooltip dark:bg-gray-700">
                                Delete
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {totalDoc > 5 && data.length !== totalDoc && (
                    <div className="text-center py-2">
                      <button
                        onClick={() => handleSeeMoreNotification(page + 1)}
                        type="button"
                        className="focus:outline-none text-blue-700 hover:underline transition ease-out duration-200 dark:text-gray-400"
                      >
                        See more notifications
                      </button>
                    </div>
                  )}
                </TableContainer>
              </Scrollbars>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default Notifications
