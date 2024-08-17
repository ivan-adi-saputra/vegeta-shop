// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin", // Custom URL untuk halaman sign-in
  },
});

export const config = {
  matcher: ["/product/detail/1"],
};
