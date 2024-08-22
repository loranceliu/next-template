"use server";
import prisma from "../utils/db"
import { Prisma } from "@prisma/client";
import Response from "../utils/res";
import { logger } from "../log/logger";

const log = logger.child({ module: "system" });

export const getUserList = async (page: Page): Promise<Page> => {
   const total = await prisma.user.count();
   const users = await prisma.user.findMany({
      skip: (page.page * page.pageSzie - page.pageSzie),
      take: page.pageSzie,
   });

   page.total = total;
   page.data = users

   return page;
}

export const createUser = async (prevMsg: Msg,formdata :User): Promise<Msg> => {

   try{
      log.info({params: formdata},"进入创建用户")
      await prisma.user.create({
         data: formdata
      })
      log.info(undefined,"退出创建用户")
      return Response.ok("sucessful")
   }catch(error){

      log.error({notice: error},"用户创建失败")

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
         if (error.code === 'P2002') {
            return Response.failed("email is exists")
         }
      }

      return Response.failed("create failed")
   }
}

export const updateUser = async (formdata :User): Promise<Msg> => {

   try{
      await prisma.user.update({
         where: {id: formdata.id },
         data: formdata
      })

      return Response.ok("sucessful")
   } catch (error) {

      log.error({msg: error},"用户更新失败")

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
         if (error.code === 'P2002') {
            return Response.failed("email is exists")
         }
      }

      return Response.failed("create failed")
   }
}

export const deleteUser = async (id: number): Promise<Msg> => {
   try{
      await prisma.user.delete({
         where: {id: id}
      })

      return Response.ok("sucessful")
   } catch (error) {

      log.error({msg: error},"用户删除失败")

      return Response.failed("delete failed")
   }
}