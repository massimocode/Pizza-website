import { Document, Schema, model } from "mongoose";
import { Order } from "../../shared/domain-entities";

// TODO: Why are we using mongoose? What value do we get from maintaining these schemas?
export default model<PersistedOrder>(
  "orders",
  new Schema(
    {
      buyer: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String
      },
      deliveryAddress: {
        line1: String,
        line2: String,
        town: String,
        postcode: String
      },
      billingAddress: {
        line1: String,
        line2: String,
        town: String,
        postcode: String
      },
      orderItems: [
        {
          name: String,
          quantity: Number,
          price: Number,
          version: String,
          imageName: String,
          description: String,
          tags: [String],
          options: [String]
        }
      ],
      deliveryMethod: String,
      date: Date,
      note: String,
      paymentMethod: String,
      paymentId: String,
      paymentFeedback: Array,
      total: Number,
      discountCode: String,
      discount: {
        name: String,
        amount: Number
      },
      voucherCode: String,
      voucher: {
        code: String,
        email: String,
        amount: Number,
        dateIssued: Date,
        dateUsed: Date
      },
      totalPayment: Number,
      status: String
    },
    {
      usePushEach: true
    }
  )
);

export type PersistedOrder = Order & Document;
