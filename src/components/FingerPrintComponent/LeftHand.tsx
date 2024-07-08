import { Box } from "@mui/material";
import { Controller } from "react-hook-form";
import lefthand from "../../assets/lefthand.svg";
import ActiveFinger from "./ActiveFinger";

export default function LeftHand({ control }: { control: any }) {
  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "220px",
        flexShrink: "0",
        aspectRatio: "210/267",
      }}
    >
      <Controller
        name="fingerNumber"
        rules={{ required: true }}
        control={control}
        render={({ field }) => {
          return (
            <>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "contain",
                }}
                src={lefthand}
                alt=""
              />
              <ActiveFinger
                sx={{ left: "19%", top: "21%" }}
                fingerNumber={1}
                currentFinger={field.value}
                onClick={(number) => field.onChange(number)}
              />
              <ActiveFinger
                sx={{ left: "34.5%", top: "13%" }}
                fingerNumber={2}
                currentFinger={field.value}
                onClick={(number) => field.onChange(number)}
              />
              <ActiveFinger
                sx={{ left: "50%", top: "10%" }}
                fingerNumber={3}
                currentFinger={field.value}
                onClick={(number) => field.onChange(number)}
              />

              <ActiveFinger
                sx={{ left: "65.5%", top: "15%" }}
                fingerNumber={4}
                currentFinger={field.value}
                onClick={(number) => field.onChange(number)}
              />

              <ActiveFinger
                sx={{ right: "-1%", top: "46.5%", transform: "rotate(20deg)" }}
                fingerNumber={5}
                currentFinger={field.value}
                onClick={(number) => field.onChange(number)}
              />
            </>
          );
        }}
      />
    </Box>
  );
}
