import { client } from "@/lib";
import { cookies } from "next/headers";
import CartButton from "./CartButton";

async function createCart() {
  const region = await client.regions.list({
    limit: 1,
  }).then((res) => res.regions[0]);

  const res = await client.carts.create({ region_id: region.id });
  return res.cart;
}

async function getCart(cartId: string) {
  const res = await client.carts.retrieve(cartId);
  return res.cart;
}

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;
  let cartIdUpdated = false;
  let cart;

  if (cartId) {
    cart = await getCart(cartId) ?? await createCart();
  } else {
    cart = await createCart();
    cartIdUpdated = true;
  }

  return <CartButton cart={cart} cartIdUpdated={cartIdUpdated} />;
}
