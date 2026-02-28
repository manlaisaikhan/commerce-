const QPAY_BASE_URL = "https://merchant.qpay.mn/v2";

let accessToken: string | null = null;
let tokenExpiry: number = 0;

export async function getQPayToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const username = process.env.QPAY_USERNAME;
  const password = process.env.QPAY_PASSWORD;

  if (!username || !password) {
    throw new Error("QPay credentials not configured");
  }

  const res = await fetch(`${QPAY_BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
    },
  });

  if (!res.ok) throw new Error("QPay auth failed");

  const data = await res.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;

  return accessToken!;
}

export async function createQPayInvoice(params: {
  orderId: string;
  amount: number;
  description: string;
  callbackUrl: string;
}) {
  const token = await getQPayToken();

  const res = await fetch(`${QPAY_BASE_URL}/invoice`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      invoice_code: process.env.QPAY_INVOICE_CODE,
      sender_invoice_no: params.orderId,
      invoice_receiver_code: "terminal",
      invoice_description: params.description,
      amount: params.amount,
      callback_url: `${params.callbackUrl}?orderId=${params.orderId}`,
    }),
  });

  if (!res.ok) throw new Error("Failed to create QPay invoice");

  return res.json();
}

export async function checkQPayPayment(invoiceId: string) {
  const token = await getQPayToken();

  const res = await fetch(`${QPAY_BASE_URL}/payment/check`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      object_type: "INVOICE",
      object_id: invoiceId,
    }),
  });

  if (!res.ok) throw new Error("Failed to check QPay payment");

  return res.json();
}
