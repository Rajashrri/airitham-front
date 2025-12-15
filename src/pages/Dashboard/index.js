import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Components
import MiniWidgets from "./MiniWidgets";
import RevenueAnalytics from "./RevenueAnalytics";
import SalesAnalytics from "./SalesAnalytics";
import EarningReports from "./EarningReports";
import Sources from "./Sources";
import RecentlyActivity from "./RecentlyActivity";
import RevenueByLocations from "./RevenueByLocations";
import ChatBox from "./ChatBox";
import LatestTransactions from "./LatestTransactions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "AIRITHM", link : "/" },
                { title : "Dashboard", link : "#" },
            ],
            reports : [
                { icon : "ri-stack-line", title : "Blogs", value : "1452", rate: "", desc   : "Total Blogs" },
                { icon : "ri-store-2-line", title : "Contact Enquiries", value   : "60" ,rate: "", desc   : "Lifetime" },
                { icon : "ri-briefcase-4-line", title : "Contact Enquiries", value : "$ 15.4", rate : "", desc : "This Month" },
                // { icon : "ri-briefcase-4-line", title : "Average Price", value : "$ 15.4", rate : "2.4%", desc : "From previous period" },
            ]
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Dashboard" breadcrumbItems={this.state.breadcrumbItems} />
                        <Row>
                            <Col xl={12}>
                                <Row>
                                    <MiniWidgets reports={this.state.reports} />
                                </Row>
                                {/* revenue Analytics */}
                                {/* <RevenueAnalytics /> */}
                            </Col>

                          
                        </Row>
                        
                        
                      

                    </Container> 
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
