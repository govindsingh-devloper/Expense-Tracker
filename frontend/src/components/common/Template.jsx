import { useSelector } from "react-redux"
import Login from "../Login";
import SignUP from "../SignUP"


 export default function Template ({title, description1, description2, formType}){

    const {loading}=useSelector((state)=>state.auth);

    return (
        <div>
            {
                loading ? (<>Loading........</>):(
                    <div className="flex items-center justify-center mt-6 ">
                    <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-black-100">{description1}</span>{" "}
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