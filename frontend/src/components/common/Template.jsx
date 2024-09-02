import { useSelector } from "react-redux"
import Login from "../Login";
import SignUP from "../SignUP"


 export default function Template ({title, description1, description2, formType}){

    const {loading}=useSelector((state)=>state.auth);

    return (
        <div>
            {
                loading ? (<>Loading........</>):(
                    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
                    <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignUP /> : <Login />}
          </div>
                    </div>
                )
            }
        </div>
    )

}