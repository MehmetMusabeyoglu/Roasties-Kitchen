import React, { useState, useEffect } from "react";
import { getOneOrder, updateOrder, updateQuantity } from '../../utils/api';
import AuthService from '../../utils/auth';
import { Button, Container, Row, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Order() {
    const [orderName, setOrderName] = useState();
    const [orderFoods, setFoods] = useState([]);
    const [orderDelivery, setDelivery] = useState();
    let { orderId } = useParams();
    const [sum, setSum] = useState(0);
    const token = AuthService.getToken();

    const [updateOrderName, setUpdateOrderName] = useState();
    const [updateOrderFoods, setUpdateOrderFoods] = useState([]);
    const [updateOrderDelivery, setUpdateOrderDelivery] = useState()

    useEffect(() => {

        const getOrderInfo = async () => {

            try {
                const response = await getOneOrder(token, orderId);
                if (!response.ok) {
                    throw new Error('No orders from user');
                }

                const orderDataRes = await response.json();

                if (orderDataRes) {
                    setOrderName(orderDataRes.orderData.orderName);
                    setFoods(orderDataRes.orderData.quantity);
                    // console.log(`orderdataaaa ${JSON.stringify(orderDataRes.orderData)}`);
                    // console.log(`food order each${JSON.stringify(orderDataRes.orderData.quantity)}`);
                    const foodArr = JSON.parse(JSON.stringify(orderDataRes.orderData.quantity));
                    setDelivery(orderDataRes.orderData.deliveryDate);
                    setUpdateOrderFoods(foodArr);
                     console.log(`setupdateorderinitial${JSON.stringify(foodArr)}`);
                }

                const priceData = await (orderDataRes.orderData.quantity.map(food => food.quantity * food.foodId.price));

                let calcSum = 0;
                for (let i = 0; i < priceData.length; i++) {
                    calcSum += priceData[i];
                }
                setSum(calcSum)

            } catch (err) {
                console.error(err);
            }
        };
        getOrderInfo();
    }, [orderId, token]);

    //const foodArr = JSON.parse(JSON.stringify(orderFoods));
    //console.log(`foooodarrrrr${JSON.stringify(foodArr)}`)

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        const index = event.target.getAttribute("index")
        if (name === 'orderName') {
            if (value === '') {
                setUpdateOrderName(orderName)
            } else {
                setUpdateOrderName(value)
            }
        }
        if (name === 'quantity') {
            if (updateOrderFoods.length < 1) {
                const foodArrUpdate = updateOrderFoods.map((foodItem, j) => {
                    if (index == j) {

                        if (value === "") {
                            foodItem.quantity = orderFoods[j].quantity
                        } else {
                            foodItem.quantity = value
                        }
                        return foodItem;
                    } else {
                        return foodItem
                    }
                })
                const priceData = (foodArrUpdate.map(food => food.quantity * food.foodId.price));
                let calcSum = 0;
                for (let i = 0; i < priceData.length; i++) {
                    calcSum += priceData[i];
                }
                setSum(calcSum)
            } else {
                const foodArrUpdate = updateOrderFoods.map((foodItem, j) => {
                    if (index == j) {

                        if (value === "") {
                            foodItem.quantity = orderFoods[j].quantity
                        } else {
                            foodItem.quantity = value
                        }
                        return foodItem;
                    } else {
                        return foodItem
                    }
                })
                const priceData = (foodArrUpdate.map(food => food.quantity * food.foodId.price));
                let calcSum = 0;
                for (let i = 0; i < priceData.length; i++) {
                    calcSum += priceData[i];
                }
                setSum(calcSum)
                setUpdateOrderFoods(foodArrUpdate)
                console.log(`iiiwantdaaattaaaa ${JSON.stringify(updateOrderFoods[1])}`);
           }
        }
    }

     console.log(`updattteeddd ${JSON.stringify(updateOrderFoods)}`);
     console.log(`reeeeeeggg fod ${JSON.stringify(orderFoods)}`);

    const handleUpdateForm = async (event) => {
        event.preventDefault();

        let foodArrData = [];

        if (updateOrderFoods.length < 1) {
            foodArrData = orderFoods
        } else {
            foodArrData = updateOrderFoods
        }

        const updateData = { orderName: updateOrderName, food: foodArrData };

        try {
            if (updateData.orderName) {
                const response = await updateOrder(token, orderId, updateData);

                if (!response.ok) {
                    throw new Error(response.message);
                }
            }


            for (let i = 0; i < updateData.food.length; i++) {
                const quantityId = updateData.food[i]._id;
                const updateQuantityData = { quantity: `${updateData.food[i].quantity}` };
                // console.log(`quantityId ${JSON.stringify(quantityId)}`)
                // console.log(`quantitydata ${JSON.stringify(updateQuantityData)}`)
                const response = await updateQuantity(token, quantityId, updateQuantityData);

                if (!response.ok) {
                    throw new Error(response.message);
                }
            }
            //console.log(`submitted data ${JSON.stringify(updateOrderFoods)}`);

        } catch (err) {
            alert(err);
        }
        document.location.href = '/dashboard';

    }


    return (
        <Container fluid>
            <Form
                onSubmit={handleUpdateForm}
            >
                <Row className="text-center" style={{ fontSize: "300%" }}>
                    <Col xs={6}>
                        Order Name:
                    </Col>
                    <Col xs={6}>
                        <FormGroup className='' id='name'>
                            <FormControl type='string'
                                name='orderName'
                                placeholder={orderName}
                                onChange={handleOnChange}
                            >
                            </FormControl>
                        </FormGroup>
                    </Col>
                </Row>
                <Row style={{ fontSize: "250%" }}>
                    <Col xs={6}>
                        Cookies
                    </Col>
                    <Col xs={3} className="text-center">
                        Quantity
                    </Col>
                    <Col xs={3} className="text-center">
                        Price
                    </Col>
                </Row>

                {updateOrderFoods.length
                    ?
                    updateOrderFoods.map((food, i) => (
                        <>
                            <Row style={{ fontSize: "150%" }}>
                                <Col xs={6}>
                                    {food.foodId.name}uuuuu
                                </Col>
                                <Col xs={3} className="text-center">
                                    <FormGroup className='' id='name'>
                                        <FormControl type='string'
                                            name='quantity'
                                            index={i}
                                            placeholder={food.quantity ? food.quantity : 0}
                                            onChange={handleOnChange}
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </Col>

                                <Col xs={3} className="text-center">
                                    ${food.foodId.price*food.quantity}
                                </Col>

                            </Row>
                        </>
                    ))
                    :
                    orderFoods.map((food, i) => (
                        <>
                            {/* <Row style={{ fontSize: "150%" }}>
                                <Col xs={6}>
                                    {food.foodId.name}jjjj
                                </Col>
                                <Col xs={3} className="text-center">
                                    <FormGroup className='' id='name'>
                                        <FormControl type='string'
                                            name='quantity'
                                            index={i}
                                            placeholder={food.quantity ? food.quantity : 0}
                                            onChange={handleOnChange}
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </Col>

                                <Col xs={3} className="text-center">
                                    ${food.foodId.price*food.quantity}
                                </Col>

                            </Row> */}
                        </>
                    ))
                }

                <Row style={{ fontSize: "175%" }}>
                    <Col xs={6}></Col>
                    <Col xs={3} className="text-center">
                        Total Price
                    </Col>
                    <Col xs={3} className="text-center">
                        ${sum}
                    </Col>
                </Row>

                <Button className='btn-secondary mt-2' type='submit'>
                    Sign Up
                </Button>

            </Form>

        </Container>
    )

    // if (orderData.length > 0) {
    //     return (

    //         <div className="container" style={{ color: "#504A6D" }}>
    //             <div className="row text-center">
    //                 <h2 className="m-3" style={{ fontSize: "300%" }}>Order: {userName}</h2>
    //             </div>
    //             <hr style={{ borderTop: "solid 5px #ff69b4" }}></hr>
    //             <div className="row" style={{ fontSize: "250%" }}>
    //                 <p className="col-6"> Cookies</p>
    //                 <p className="col-3 text-center">Quantity</p>
    //                 <p className="col-3 text-center">Price</p>
    //             </div>

    //             {orderData
    //                 ?
    //                 orderData.map((food) => (
    //                     <div key={food._id}>
    //                         <div className="row" style={{ fontSize: "150%" }}>
    //                             <p className="col-6">{food.name}</p>
    //                             <p className="col-3 text-center">num</p>
    //                             <p className="col-3 text-center">${food.price}</p>
    //                         </div>
    //                     </div>
    //                 ))
    //                 :
    //                 <div>
    //                     <p>No cookies added to your order</p>
    //                 </div>
    //             }
    //             <hr style={{ borderTop: "solid 5px #ff69b4" }}></hr>
    //             <div className="row" style={{ fontSize: "150%" }}>
    //                 <p className="col-7"></p>
    //                 <p className="col-2" style={{ fontSize: "125%" }}>Total Price:</p>
    //                 <p className="col-3 mb-2 text-center" style={{ fontSize: "125%" }}>${sum}</p>
    //             </div>
    //             <div className="row" style={{ fontSize: "150%" }}>
    //                 <div className="col-10"></div>
    //                 <Button className="col-2" style={{ fontSize: "110%", backgroundColor: "#504A6D", color: "#eaded2", border: "none" }}>Confirm Order</Button>
    //             </div>
    //         </div>
    //     )
    // } else {
    //     return (
    //         <div className="container text-center" style={{ color: "#504A6D" }}>
    //             <div className="row text-center">
    //                 <h2 className="m-3" style={{ fontSize: "300%" }}>Welcome, {userName}</h2>
    //             </div>
    //             <hr style={{ borderTop: "solid 5px #ff69b4" }}></hr>
    //             <div className="row text-center">
    //                 <p className="m-3" style={{ fontSize: "150%" }}>No cookies in your order</p>
    //             </div>
    //         </div>
    //     )
    // }
}