import React, { useContext, useState } from 'react'
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from '@windmill/react-ui'
import { useTranslation } from 'react-i18next'
import { FiPlus } from 'react-icons/fi'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

//internal import

import useAsync from '@/hooks/useAsync'
import useToggleDrawer from '@/hooks/useToggleDrawer'
import UploadMany from '@/components/common/UploadMany'
import NotFound from '@/components/table/NotFound'
import ProductServices from '@/services/ProductServices'
import PageTitle from '@/components/Typography/PageTitle'
import { SidebarContext } from '@/context/SidebarContext'
import ProductTable from '@/components/product/ProductTable'
import MainDrawer from '@/components/drawer/MainDrawer'
import ProductDrawer from '@/components/drawer/ProductDrawer'
import CheckBox from '@/components/form/others/CheckBox'
import useProductFilter from '@/hooks/useProductFilter'
import DeleteModal from '@/components/modal/DeleteModal'
import BulkActionDrawer from '@/components/drawer/BulkActionDrawer'
import TableLoading from '@/components/preloader/TableLoading'
import SelectCategory from '@/components/form/selectOption/SelectCategory'
import AnimatedContent from '@/components/common/AnimatedContent'

const Products = () => {
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } = useToggleDrawer()

  const { t } = useTranslation()
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    searchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
  } = useContext(SidebarContext)

  const { data, loading, error } = useAsync(() =>
    ProductServices.getAllProducts({
      page: currentPage,
      limit: limitData,
      category: category,
      title: searchText,
      price: sortedField,
    })
  )

  // console.log("product page", data);

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [isCheck, setIsCheck] = useState([])

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll)
    setIsCheck(data?.products.map((li) => li._id))
    if (isCheckAll) {
      setIsCheck([])
    }
  }
  // handle reset field
  const handleResetField = () => {
    setCategory('')
    setSortedField('')
    searchRef.current.value = ''
  }

  // console.log('productss',products)
  const { serviceData, filename, isDisabled, handleSelectFile, handleUploadMultiple, handleRemoveSelectFile } =
    useProductFilter(data?.products)

  return (
    <>
      <PageTitle>{t('productsScreen.productsPage')}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <BulkActionDrawer ids={allId} title="Products" />
      <MainDrawer>
        <ProductDrawer id={serviceId} />
      </MainDrawer>
      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody className="">
            <form onSubmit={handleSubmitForAll} className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex">
              <div className="flex-grow-0 sm:flex-grow md:flex-grow lg:flex-grow xl:flex-grow">
                <UploadMany
                  title="Products"
                  filename={filename}
                  isDisabled={isDisabled}
                  total={data?.total}
                  handleSelectFile={handleSelectFile}
                  handleUploadMultiple={handleUploadMultiple}
                  handleRemoveSelectFile={handleRemoveSelectFile}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <Button
                    disabled={isCheck.length < 1}
                    onClick={() => handleUpdateMany(isCheck)}
                    className="w-full rounded-md h-12 btn-gray text-gray-600"
                  >
                    <span className="mr-2">
                      <FiEdit />
                    </span>
                    {t('productsScreen.bulkActionsBtn')}
                  </Button>
                </div>
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <Button
                    disabled={isCheck?.length < 1}
                    onClick={() => handleDeleteMany(isCheck, data.products)}
                    className="w-full rounded-md h-12 bg-red-300 disabled btn-red"
                  >
                    <span className="mr-2">
                      <FiTrash2 />
                    </span>

                    {t('common.delete')}
                  </Button>
                </div>
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                    <span className="mr-2">
                      <FiPlus />
                    </span>
                    {t('productsScreen.addProduct')}
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>

        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
          <CardBody>
            <form onSubmit={handleSubmitForAll} className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input ref={searchRef} type="search" name="search" placeholder={t('productsScreen.search')} />
                <button type="submit" className="absolute right-0 top-0 mt-5 mr-1"></button>
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <SelectCategory setCategory={setCategory} lang={lang} />
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Select onChange={(e) => setSortedField(e.target.value)}>
                  <option value="All" defaultValue hidden>
                    {t('productsScreen.selectPrice.title')}
                  </option>
                  <option value="low">{t('productsScreen.selectPrice.lowtoHigh')}</option>
                  <option value="high">{t('productsScreen.selectPrice.hightoLow')}</option>
                  <option value="published">{t('productsScreen.selectPrice.published')}</option>
                  <option value="unPublished">{t('productsScreen.selectPrice.unpublished')}</option>
                  <option value="status-selling">{t('productsScreen.selectPrice.statusSelling')}</option>
                  <option value="status-out-of-stock">{t('productsScreen.selectPrice.statusStock')}</option>
                  <option value="date-added-asc">{t('productsScreen.selectPrice.dateAddedAsc')}</option>
                  <option value="date-added-desc">{t('productsScreen.selectPrice.dateAddedDesc')}</option>
                  <option value="date-updated-asc">{t('productsScreen.selectPrice.dateUpdatedAsc')}</option>
                  <option value="date-updated-desc">{t('productsScreen.selectPrice.dateUpdatedDesc')}</option>
                </Select>
              </div>
              <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <div className="w-full mx-1">
                  <Button type="submit" className="h-12 w-full bg-emerald-700">
                    {t('productsScreen.filterBtn')}
                  </Button>
                </div>

                <div className="w-full mx-1">
                  <Button
                    layout="outline"
                    onClick={handleResetField}
                    type="reset"
                    className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                  >
                    <span className="text-black dark:text-gray-200">{t('productsScreen.resetBtn')}</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    isChecked={isCheckAll}
                    handleClick={handleSelectAll}
                  />
                </TableCell>
                <TableCell>{t('productsScreen.table.productNameTbl')}</TableCell>
                <TableCell>{t('productsScreen.table.categoryTbl')}</TableCell>
                <TableCell>{t('productsScreen.table.priceTbl')}</TableCell>
                <TableCell>{t('productsScreen.table.salePriceTbl')}</TableCell>
                <TableCell>{t('productsScreen.table.stockTbl')}</TableCell>
                <TableCell className="text-center">{t('productsScreen.table.addQuantity')}</TableCell>
                <TableCell>{t('productsScreen.table.statusTbl')}</TableCell>
                <TableCell className="text-center">{t('productsScreen.table.detailsTbl')}</TableCell>
                <TableCell className="text-center">{t('productsScreen.table.publishedTbl')}</TableCell>
                <TableCell className="text-right">{t('productsScreen.table.actionsTbl')}</TableCell>
              </tr>
            </TableHeader>
            <ProductTable lang={lang} isCheck={isCheck} products={data?.products} setIsCheck={setIsCheck} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.total}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Product Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Product" />
      )}
    </>
  )
}

export default Products
