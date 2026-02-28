const ODOO_URL = process.env.ODOO_URL || "";
const ODOO_DB = process.env.ODOO_DB || "";
const ODOO_USERNAME = process.env.ODOO_USERNAME || "";
const ODOO_PASSWORD = process.env.ODOO_PASSWORD || "";

async function odooJsonRpc(url: string, method: string, params: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method,
      params,
      id: Date.now(),
    }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

async function authenticate(): Promise<number> {
  const result = await odooJsonRpc(`${ODOO_URL}/jsonrpc`, "call", {
    service: "common",
    method: "authenticate",
    args: [ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD, {}],
  });
  return result;
}

export async function fetchOdooProducts() {
  if (!ODOO_URL) return [];

  const uid = await authenticate();

  const result = await odooJsonRpc(`${ODOO_URL}/jsonrpc`, "call", {
    service: "object",
    method: "execute_kw",
    args: [
      ODOO_DB,
      uid,
      ODOO_PASSWORD,
      "product.template",
      "search_read",
      [[["sale_ok", "=", true]]],
      {
        fields: ["name", "list_price", "description_sale", "categ_id", "image_1920", "qty_available"],
        limit: 100,
      },
    ],
  });

  return result;
}

export async function createOdooOrder(orderData: {
  partnerId: number;
  lines: Array<{ productId: number; quantity: number; price: number }>;
}) {
  if (!ODOO_URL) return null;

  const uid = await authenticate();

  const orderLines = orderData.lines.map((line) => [
    0,
    0,
    {
      product_id: line.productId,
      product_uom_qty: line.quantity,
      price_unit: line.price,
    },
  ]);

  const result = await odooJsonRpc(`${ODOO_URL}/jsonrpc`, "call", {
    service: "object",
    method: "execute_kw",
    args: [
      ODOO_DB,
      uid,
      ODOO_PASSWORD,
      "sale.order",
      "create",
      [{ partner_id: orderData.partnerId, order_line: orderLines }],
    ],
  });

  return result;
}
