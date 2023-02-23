import ProfilePic from '../../../static/img/ProfilePic.png'

export default function ProfileSection() {
    return (
        <div>
            <div className='fixed bottom-0 w-56 h-12 flex items-center border-t border-[#303135]'>
                <div className='flex justify-start items-center mx-3 gap-2'>
                    <div>
                        <img src={ProfilePic} className='h-7 w-7' />
                    </div>
                    <div>
                        <div className='text-base font-semibold'>Rizki Judojono</div>
                        <div className='text-xs text-[#B8BABC]'>adiputra979@gmail.com</div>
                    </div>
                </div>
            </div>
        </div>
    )
}