import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ILibraryInfo } from "types";
import { FilterDropdownProps } from "antd/lib/table/interface";
import { useStores } from "hooks";

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
    const { regionsStore } = useStores();

    useEffect(() => {
        regionsStore.getData();
    }, []);

    const columns = [
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
        {
            title: "",
            key: "action",
            render: (text: string, record: ILibraryInfo) => (
                <Space>
                    <Link to={`/info/${record.order}`}>Подробнее</Link>
                </Space>
            ),
            width: 112,
        },
    ];

    return (
        <Table
            rowKey={"order"}
            columns={columns}
            dataSource={regionsStore.data}
            bordered
            pagination={false}
            loading={regionsStore.loading}
        />
    );
};
export default observer(List);
