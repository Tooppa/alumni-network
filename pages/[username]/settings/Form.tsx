import { FormEvent } from 'react'

const SettingsForm = ({ data }: any) => {
    //currently empty function but in the future submitting a edited user could be done here
    const registerUser = async (event: FormEvent) => {
        event.preventDefault()
        /*
        const res = await fetch('/api/register', {
          body: JSON.stringify({
            name: event.target
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })

        const result = await res.json()
        // result.user => 'Ada Lovelace'*/
    }
    return (
        <div className="flex w-full justify-center">
            <form onSubmit={registerUser} className="flex flex-col w-full max-w-3xl  border border-solid border-gray-900 p-7">
                <div className="flex justify-between m-2">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="border border-solid border-gray-900"
                    />
                </div>
                <div className="flex justify-between m-2">
                    <label htmlFor="workStatus">WorkStatus</label>
                    <input
                        id="workStatus"
                        name="workStatus"
                        type="text"
                        autoComplete="workStatus"
                        required
                        className="border border-solid border-gray-900"
                    />
                </div>
                <div className="flex justify-between m-2">
                    <label htmlFor="bio">Bio</label>
                    <input
                        id="bio"
                        name="bio"
                        type="text"
                        autoComplete="bio"
                        required
                        className="border border-solid border-gray-900"
                    />
                </div>
                <div className="flex justify-between m-2">
                    <label htmlFor="funFact">FunFact</label>
                    <input
                        id="funFact"
                        name="funFact"
                        type="text"
                        autoComplete="funFact"
                        required
                        className="border border-solid border-gray-900"
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default SettingsForm