import { Box } from "@mui/material";
import { Controller } from "react-hook-form";
import lefthand from "../../assets/righthand.svg";
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
                sx={{ left: "20.5%", top: "22%", height: "25%" }}
                fingerNumber={5}
                currentFinger={field.value}
                onClick={(number) => field.onChange(number)}
              />
              <ActiveFinger
                sx={{ left: "36%", top: "13%", height: "30%" }}
                fingerNumber={4}
                currentFinger={field.value}
                onClick={(number) => field.onChange(number)}
              />
              <ActiveFinger
                sx={{ left: "51%", top: "10%", height: "33%" }}
                fingerNumber={3}
                currentFinger={field.value}
                onClick={(number) => field.onChange(number)}
              />

              <ActiveFinger
                sx={{ left: "66.5%", top: "16%", height: "28%" }}
                fingerNumber={2}
                currentFinger={field.value}
                onClick={(number) => field.onChange(number)}
              />

              <ActiveFinger
                sx={{
                  right: "5%",
                  top: "45.5%",
                  transform: "rotate(-34deg)",
                  height: "20%",
                }}
                fingerNumber={1}
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
