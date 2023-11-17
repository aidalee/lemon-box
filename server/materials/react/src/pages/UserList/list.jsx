import SearchForm from '@/components/SearchForm'
import BaseTable from '@/components/BasicTable'
import {useTableListService} from '@/hooks'
import {Form} from 'antd'
import dayjs from 'dayjs'

function List() {
    const [form] = Form.useForm()
    const searchFormList = [
        {
            type: 'input',
            name: 'name',
            placeholder: '请输入姓名'
        }
    ]
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '手机号',
            dataIndex: 'phone'
        },
        {
            title: 'E-mail',
            dataIndex: 'email'
        },
        {
            title: '创建时间',
            render: (item) => {
                return <>{item?.created_at ? dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
            }
        }
    ]

    function getList({current, pageSize}, formData) {

        const params = {
            page: current,
            limit: pageSize,
            ...formData
        }
        // return httpGetUserList(params).then(res => ({
        //     total: res.total,
        //     list: res.data
        // }))

    }

    const {tableProps, search} = useTableListService(getList, {form, cacheKey: 'user-list'});
    const {submit: formSearch, reset} = search;

    return (
        <div>
            <SearchForm form={form} searchFormList={searchFormList} search={formSearch} reset={reset}/>
            <BaseTable columns={columns} tableProps={tableProps} rowKey={() => Math.random()}/>
        </div>
    )
}

export default List
