import React, { useEffect, useState, FC } from "react";
import { Button, Input, Space, Table, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ILibraryInfo } from "types";
import { getData } from "api";
import { FilterDropdownProps, ColumnType } from "antd/lib/table/interface";

const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
    }: FilterDropdownProps) => {
        return (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => {
                        confirm();
                    }}
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            confirm();
                        }}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Поиск
                    </Button>
                    <Button
                        onClick={clearFilters}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Сброс
                    </Button>
                </Space>
            </div>
        );
    },
    filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
        record[dataIndex]
            ? record[dataIndex]
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase())
            : "",
});

const List: FC = () => {
    const [data, setData] = useState<ILibraryInfo[] | []>([]);

    useEffect(() => {
        getData().then(setData);
    }, []);

    console.log(data);

    const { Title } = Typography;

    const columns = [
        {
            title: "Order",
            dataIndex: "order",
            key: "order",
            width: 100,
        },
        {
            title: "Регион",
            dataIndex: "territory",
            key: "territory",
            ...getColumnSearchProps("territory"),
        },
        {
            title: "Кол-во библиотек",
            dataIndex: "libraries",
            key: "libraries",
            sorter: (a: ILibraryInfo, b: ILibraryInfo) =>
                a.libraries - b.libraries,
            ellipsis: true,
        },
    ];

    return (
        <>
            <Title>Список регионов</Title>
            <Table
                rowKey={"order"}
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}
            />
        </>
    );
};
export default List;
