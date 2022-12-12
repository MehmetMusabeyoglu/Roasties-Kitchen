import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { RxCookie } from "react-icons/rx";
import Menu from "../assets/Menu.pdf";
import BrownChocolateChipCookie from "../assets/BrownChocolateChipCookie.png";
import CherryCheesecakeCookie from "../assets/CherryCheesecakeCookie.png";
import ChocolateCookie from "../assets/ChocolateCookie.png";
import PeanutButterCookie from "../assets/PeanutButterCookie.png";
import WalnutCookie from "../assets/WalnutCookie.png";


export default function LoggedOutMenu() {
    return (
        <Container className="mb-30 col-11">
            <Row className="justify-content-center pb-2">
                <Col className="col-8 p-2 mt-4">
                    <p className="text-center" style={{ fontSize: "150%", color: "#504A6D" }}> Click icon to download our menu
                        <a
                            className="btn justify-content-md-center mx-1"
                            href={Menu}
                            download="Menu.pdf"
                        >
                            <RxCookie color="#504A6D" size={30} />
                        </a>
                    </p>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col className="col-12">
                    <Card className="flex-row border-0 m-2" style={{ backgroundColor: "#DBBDC7", maxWidth: "250px" }}>
                        <Card.Title className="pt-5 pr-3" style={{ fontSize: "125%", color: "#504A6D" }}>
                            Brown Chocolate Chip Cookie</Card.Title>
                        <Card.Img variant="top"
                            src={BrownChocolateChipCookie} />
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col className="col-12">
                    <Card className="flex-row border-0 m-2" style={{ backgroundColor: "#DBBDC7", maxWidth: "250px" }}>
                        <Card.Title className="pt-5 pr-3" style={{ fontSize: "125%", color: "#504A6D" }}>
                            Cherry Cheesecake Cookie</Card.Title>
                        <Card.Img variant="top"
                            src={CherryCheesecakeCookie} />
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col className="col-12">
                    <Card className="flex-row border-0 m-2" style={{ backgroundColor: "#DBBDC7", maxWidth: "250px" }}>
                        <Card.Title className="pt-5 pr-3" style={{ fontSize: "125%", color: "#504A6D" }}>
                            Chocolate Cookie</Card.Title>
                        <Card.Img variant="top"
                            src={ChocolateCookie} />
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col className="col-12">
                    <Card className="flex-row border-0 m-2" style={{ backgroundColor: "#DBBDC7", maxWidth: "250px" }}>
                        <Card.Title className="pt-5 pr-3" style={{ fontSize: "125%", color: "#504A6D" }}>
                            Peanut Butter Cookie</Card.Title>
                        <Card.Img variant="top"
                            src={PeanutButterCookie} />
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center pb-5">
                <Col className="col-12 pb-4">
                    <Card className="flex-row border-0 m-2" style={{ backgroundColor: "#DBBDC7", maxWidth: "250px" }}>
                        <Card.Title className="pt-5 pr-3" style={{ fontSize: "125%", color: "#504A6D" }}>
                            Walnut Cookie</Card.Title>
                        <Card.Img variant="top"
                            src={WalnutCookie} />
                    </Card>
                </Col>
            </Row>
        </Container >
    )
}