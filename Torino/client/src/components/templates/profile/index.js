"use client"
import AccountInformation from './AccountInfoForm'
import BankAccountInfo from './bankAccountInfo'
import { useGetUserData } from '@/core/services/queries'
import PersonalInfo from './PersonalInfo'
import useAuthToken from '@/core/hook/useAuthToken'


function Profile() {
  const { hasToken } = useAuthToken();
  const { data, isPending } = useGetUserData(hasToken)
  return (
  <>
  <AccountInformation data={data}/>
  <PersonalInfo data={data}/>
  <BankAccountInfo data={data}/>
  </>
  )
}

export default Profile