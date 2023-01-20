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
  const result = await client.user.findMany({
    where: {
      email: jsonValue.id,
      password: jsonValue.pw,
    },
  });
  try {
    if (result.length === 1) {
      res.status(200).json({ result: "로그인 성공" });
    } else {
      res.status(200).json({ result: "아이디, 비밀번호를 확인하세요" });
    }
  } catch {
    res.status(200).json({ result: "로그인 실패" });
  }
}
