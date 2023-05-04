interface InfoProps {
  info: boolean
  handleInfo: (info: boolean) => void 
}

export default function Info({ info , handleInfo }: InfoProps): JSX.Element {
  return (
    <>
      {
        info && <div className='Info'>Some task is already being updated. Please save it and try again.
          <button onClick={() => handleInfo(false)}className='CloseInfo'>X</button>
        </div>
      }
    </>
  )
}
