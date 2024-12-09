import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {


    const { data, error } = await resend.emails.send({
      from: 'robot@mesaconnect.io',
      to: ['joshrashtian1@gmail.com'],
      subject: 'Hello world',
      html: '<p>Hello world</p>',
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
​
4