import React from 'react'
import Modal from './Modal'


type AccountModalPropsType = {
    setCreateAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
    newAccountName: string;
    setNewAccountName: React.Dispatch<React.SetStateAction<string>>;
    creatingAccount: boolean
}

function AccountModalComponent({
    setCreateAccountOpen,
    newAccountName,
    setNewAccountName,
    creatingAccount
}: AccountModalPropsType) {
    return (
        <>
            <Modal onClose={() => setCreateAccountOpen(false)}>
                <div className="p-6 w-full max-w-md bg-blue-950 rounded-md mx-auto">
                    <h3 className="text-lg font-semibold mb-2 text-slate-100">Create New Account</h3>
                    <form
                        // onSubmit={handleCreateAccount}
                        className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-200/80">Account Name</label>
                            <input
                                value={newAccountName}
                                onChange={(e) => setNewAccountName(e.target.value)}
                                className="text-slate-100 mt-1 w-full rounded-md border px-3 py-2"
                                placeholder="e.g. Savings"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setCreateAccountOpen(false)} className="cursor-pointer text-slate-100 px-3 py-2 rounded-md border">Cancel</button>
                            <button type="submit" className="cursor-pointer px-4 py-2 rounded-md bg-slate-100 text-blue-950 ">{creatingAccount ? "Creating..." : "Create"}</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}



const AccountModal = React.memo(AccountModalComponent);

export default AccountModal;