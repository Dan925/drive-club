

type Props = {
    csrfToken: string | undefined;
}
const Login: React.FC<Props> = ({ csrfToken }) => {

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1>Sign In</h1>
            <form method="post" action="/api/auth/signin/email" className="flex flex-col gap-3">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <label className="flex gap-2 text-lg font-bold items-center">
                    Email address
                    <input type="email" id="email" name="email" className="p-3 font-normal rounded-lg text-bgrd-b" />
                </label>
                <button className="rounded-lg bg-bgrd-b px-10 py-3 font-semibold text-white no-underline transition hover:bg-accent hover:cursor-pointer" type="submit">Sign in with Email</button>
            </form>
        </div>
    );
};

export default Login;
