import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const ADMIN_EMAIL = "manlaisaikhan6@gmail.com";

interface OrderItem {
  product: { name: string };
  quantity: number;
  price: number;
  size?: string | null;
}

interface OrderEmailData {
  orderId: string;
  total: number;
  phone: string;
  address: string;
  note?: string | null;
  items: OrderItem[];
}

export async function sendNewOrderEmail(order: OrderEmailData) {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #333">${item.product.name}${item.size ? ` (${item.size})` : ""}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #333;text-align:center">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #333;text-align:right">${(item.price * item.quantity).toLocaleString()}₮</td>
        </tr>`
    )
    .join("");

  await getResend().emails.send({
    from: "AURON Store <onboarding@resend.dev>",
    to: ADMIN_EMAIL,
    subject: `Шинэ захиалга #${order.orderId.slice(-6).toUpperCase()}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#111;color:#fff;padding:32px;border-radius:12px">
        <h1 style="font-size:20px;margin:0 0 24px">Шинэ захиалга орлоо!</h1>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <thead>
            <tr style="border-bottom:2px solid #333">
              <th style="padding:8px 12px;text-align:left;color:#999">Бараа</th>
              <th style="padding:8px 12px;text-align:center;color:#999">Тоо</th>
              <th style="padding:8px 12px;text-align:right;color:#999">Үнэ</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>

        <div style="background:#1a1a1a;padding:16px;border-radius:8px;margin-bottom:16px">
          <p style="margin:0 0 8px;color:#999;font-size:14px">Нийт дүн</p>
          <p style="margin:0;font-size:24px;font-weight:bold">${order.total.toLocaleString()}₮</p>
        </div>

        <div style="background:#1a1a1a;padding:16px;border-radius:8px">
          <p style="margin:0 0 4px"><strong>Утас:</strong> ${order.phone}</p>
          <p style="margin:0 0 4px"><strong>Хаяг:</strong> ${order.address}</p>
          ${order.note ? `<p style="margin:0"><strong>Тэмдэглэл:</strong> ${order.note}</p>` : ""}
        </div>

        <p style="margin:24px 0 0;color:#666;font-size:12px">Захиалгын дугаар: ${order.orderId}</p>
      </div>
    `,
  });
}
