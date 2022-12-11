const { User, Food, Order } = require("../models");

module.exports = {
    getOrder(req, res){
        Order.find()
        .select('-__v')
        .then((orderData) => {
            res.json(orderData);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    async createOrder(req, res){
        try {
            const newOrder = await Order.create(req.body);
            const updatedUser = await User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { orders: newOrder._id } },
              { new: true, runValidators: true }
            );
            return res.json(updatedUser);
          } catch (err) {
            console.log(err);
            return res.status(400).json(err);
          }
    },

    changeOrder(req, res){
        Order.findOneAndUpdate(
            { _id: req.params.orderId },
            {$set: req.body},
            { runValidators: true, new: true }
        )
            .then((orderData) =>
                !orderData
                    ? res
                        .status(404)
                        .json({ message: 'No thought found' })
                    : res.json(orderData)
            )
            .catch((err) => res.status(500).json(err));

    },

    deleteOrder(req, res){
        Order.findOneAndRemove(
            { _id: req.params.orderId }
        )
        .then((orderData) =>
        !orderData
            ? res
                .status(404)
                .json({ message: 'No order found' })
            : res.json(orderData)
    )
            .catch((err) => res.status(500).json(err));
    },

    addCookie(req, res){
            Order.findOneAndUpdate(
                { _id: req.params.orderId },
                { $addToSet: { food: req.body } },
                { runValidators: true, new: true })

                .then((orderData) =>
                !orderData
                    ? res
                        .status(404)
                        .json({ message: 'No order found' })
                    : res.json(orderData)
            )
            .catch((err) => res.status(500).json(err));
    },
    getOneOrder(req, res) {
        Order.findOne({ _id: req.params.orderId })
            .select('-__v')
            .populate("food")
            .then((orderData) =>
                !orderData
                    ? res.status(404).json({ message: 'No order found' })
                    : res.json({
                        orderData,
                        message: "Order Found",
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
};