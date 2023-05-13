interface InfoProps {
  info: boolean
  onHandleInfo: (info: boolean) => void
}

export default function Info({ info, onHandleInfo }: InfoProps): JSX.Element {
  
  return (
    <>
      {
        info && <div className='Info'>Some task is already being updated. Please save it and try again.
          <button onClick={() => onHandleInfo(false)} className='CloseInfo'>X</button>
        </div>
      }
    </>
  )
}
