import { ThreeDots } from "react-loader-spinner";

export default function ButtonSpinner() {
  return (
    <div className="absolute h-full w-full flex items-center justify-center">
      <ThreeDots
        height="32" 
        width="60" 
        radius="9"
        color="white" 
        ariaLabel="three-dots-loading"
        wrapperClass="absolute"
        visible={true}
      />
    </div>
  )
}