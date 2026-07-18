import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import PaymentMethod from "@/models/PaymentMethod";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";


// =========================
// UPDATE PAYMENT METHOD
// =========================
export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    const { id } = await params;


    // Check ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment method id",
        },
        {
          status: 400,
        }
      );
    }


    const oldMethod =
      await PaymentMethod.findById(id);


    if (!oldMethod) {
      return NextResponse.json(
        {
          success:false,
          message:"Payment method not found",
        },
        {
          status:404,
        }
      );
    }


    const form = await req.formData();


    console.log(
      "========== UPDATE PAYMENT =========="
    );

    console.log("ID:", id);

    console.log({
      name: form.get("name"),
      accountName: form.get("accountName"),
      accountNumber: form.get("accountNumber"),
      enabled: form.get("enabled"),
      logo: form.get("logo"),
      qr: form.get("qr"),
    });



    // Keep old value if empty
    const name =
      String(form.get("name") || "")
      || oldMethod.name;


    const accountName =
      String(form.get("accountName") || "")
      || oldMethod.accountName;


    const accountNumber =
      String(form.get("accountNumber") || "")
      || oldMethod.accountNumber;


    const enabled =
      form.get("enabled") !== null
        ? form.get("enabled") === "true"
        : oldMethod.enabled;



    const updateData:any = {

      name,

      accountName,

      accountNumber,

      enabled,

    };



    // =========================
    // CLOUDINARY UPLOAD
    // =========================

    async function uploadImage(
      file:any
    ) {

      if (
        !file ||
        typeof file === "string" ||
        file.size === 0
      ) {
        return null;
      }


      const bytes =
        await file.arrayBuffer();


      const buffer =
        Buffer.from(bytes);



      return await new Promise<UploadApiResponse>(
        (resolve,reject)=>{

          cloudinary.uploader.upload_stream(
            {
              folder:"payment-methods",
            },

            (error,result)=>{

              if(error){

                reject(error);

                return;
              }


              if(!result){

                reject(
                  new Error(
                    "Cloudinary upload failed"
                  )
                );

                return;
              }


              resolve(result);

            }

          ).end(buffer);


        }
      );


    }



    const logoFile =
      form.get("logo") as File | null;


    const qrFile =
      form.get("qr") as File | null;



    const logo =
      await uploadImage(logoFile);



    if(logo){

      updateData.logo =
        logo.secure_url;

    }



    const qr =
      await uploadImage(qrFile);



    if(qr){

      updateData.qr =
        qr.secure_url;

    }



    console.log(
      "UPDATE DATA:",
      updateData
    );



    const method =
      await PaymentMethod.findByIdAndUpdate(

        id,

        updateData,

        {
          returnDocument:"after",
          runValidators:true,
        }

      );



    return NextResponse.json({

      success:true,

      method,

    });



  } catch(error:any){

    console.error(
      "UPDATE ERROR:",
      error
    );


    return NextResponse.json(

      {
        success:false,
        message:
        error.message ||
        "Failed to update payment method",
      },

      {
        status:500,
      }

    );

  }
}



// =========================
// DELETE PAYMENT METHOD
// =========================

export async function DELETE(
  req:Request,
  {
    params,
  }:{
    params:Promise<{id:string}>
  }
){

  try{

    await connectDB();


    const {id}=await params;



    const method =
      await PaymentMethod.findByIdAndDelete(id);



    if(!method){

      return NextResponse.json(
        {
          success:false,
          message:"Payment method not found",
        },
        {
          status:404,
        }
      );

    }



    return NextResponse.json({

      success:true,

      message:
      "Payment method deleted successfully",

    });



  }catch(error:any){


    console.error(error);



    return NextResponse.json(

      {
        success:false,
        message:
        "Failed to delete payment method",
      },

      {
        status:500,
      }

    );

  }

}