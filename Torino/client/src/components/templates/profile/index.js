"use client"
import AccountInformation from './AccountInfoForm'
import BankAccountInfo from './bankAccountInfo'
import { useGetUserData } from '@/core/services/queries'
import PersonalInfo from './PersonalInfo'

function Profile() {
  const { data, isPending } = useGetUserData()
  return (
  <>
  <AccountInformation data={data}/>
  <PersonalInfo data={data}/>
  <BankAccountInfo data={data}/>
  </>
  )
}

export default Profile