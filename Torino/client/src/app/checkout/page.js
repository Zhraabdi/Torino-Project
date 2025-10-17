import AuthProvider from "@/components/partials/providers/AuthProvider";
import CheckOut from "@/components/templates/checkout";

function CheckOutPage() {
  return (
    <AuthProvider>
    < CheckOut/>
    </AuthProvider>
  )
}

export default CheckOutPage