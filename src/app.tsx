import React, { FC } from "react";
import { Redirect, Route, Switch, Link, useLocation } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import List from "components/List";
import Info from "components/Info";
import styled from "styled-components";
import "./app.css";

const Wrapper = styled.div`
    min-height: calc(100vh - 103px);
    padding: 24px;
    background: #fff;
`;

const App: FC = () => {
    const { Content, Footer } = Layout;

    const location = useLocation();

    return (
        <Layout className="layout">
            <Content style={{ padding: "0 50px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>
                        <Link to="/list">Список регионов</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Wrapper>
                    <Switch location={location}>
                        <Route path="/list/" exact component={List}></Route>
                        <Route
                            path="/info/:order/"
                            exact
                            component={Info}
                        ></Route>
                        <Redirect to="/list/" />
                    </Switch>
                </Wrapper>
            </Content>
            <Footer></Footer>
        </Layout>
    );
};

export default App;
