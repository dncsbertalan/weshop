import { Button, ButtonProps, Icon, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { LuLogIn } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router";

import { useAuthentication } from "@/features/authentication/hooks/useAuthentication";
import { useAddProductToCart } from "@/features/cart/hooks/useAddProductToCart";
import { Navigation } from "@/routes/navigation";

import { Dialog } from "../Dialog";
import { EmptyState } from "../ui/EmptyState";

interface AddProductToCartButtonProps extends ButtonProps {
  productId: number;
}

export function AddProductToCartButton({ productId, ...rest }: AddProductToCartButtonProps) {
  const { isAuthenticated } = useAuthentication();
  const [open, setOpen] = useState<boolean>(false);

  const { mutate, isPending } = useAddProductToCart();
  const add = () => {
    if (!isAuthenticated) {
      setOpen(true);
      return;
    }

    mutate({ productId });
  };

  return (
    <>
      <Button rounded="full" onClick={add} {...rest} loading={isPending}>
        <Icon>
          <MdAddShoppingCart />
        </Icon>
        Add to cart
      </Button>
      <Dialog
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        body={
          <EmptyState
            size="lg"
            paddingY={10}
            icon={<LuLogIn />}
            title="Looks like you are not logged in"
            description="Log into your account in order to place items into your cart. If you have no account yet, you could sign up."
          />
        }
        footer={
          <Stack width="full" alignItems="center">
            <Link to={Navigation.login}>
              {" "}
              <Button rounded="full" size="2xl" w="full" paddingX={20}>
                Log in
              </Button>
            </Link>
          </Stack>
        }
        noCloseTrigger
      />
    </>
  );
}
