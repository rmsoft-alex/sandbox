// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const jsonValue = JSON.parse(req.body);
  console.log(jsonValue);
  const user = await client.user.create({
    data: jsonValue,
  });
  console.log(user);
  try {
    res.status(200).json({ result: "성공" });
  } catch {
    res.status(200).json({ result: "실패" });
  }
}
