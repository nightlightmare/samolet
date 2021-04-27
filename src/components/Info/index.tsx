import React, { FC, useEffect } from "react";
import { ILibraryInfo } from "types";
import { useParams } from "react-router-dom";
import { Col, Divider, Row, Spin, Statistic } from "antd";
import { observer } from "mobx-react";
import { useStores } from "hooks";

const Info: FC = () => {
    const obj: { order: string } = useParams();
    const { regionsStore } = useStores();

    useEffect(() => {
        regionsStore.getData();
    }, []);

    const region = regionsStore.data.find(
        (region: ILibraryInfo) => region.order === parseInt(obj.order)
    );

    return (
        <>
            {regionsStore.loading ? (
                <Spin />
            ) : (
                <>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic
                                title="Название"
                                value={region?.fullname}
                            />
                        </Col>
                        <Col span={12}>
                            <Statistic
                                title="Регион"
                                value={region?.territory}
                            />
                        </Col>
                        <Col span={24}>
                            <Statistic
                                title="Документ"
                                value={region?.formname}
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <Row gutter={16}>
                        <Col span={8}>
                            <Statistic
                                title="Подписчиков"
                                value={region?.subscribers}
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="Компьютеров"
                                value={region?.computers}
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="Библиотек"
                                value={region?.libraries}
                            />
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};
export default observer(Info);
