import { Box, Typography } from "@mui/material";
import { usersConfig } from "../../utils/config";
import { Controller } from "react-hook-form";

export default function UsersSelection({ control }: { control: any }) {
  return (
    <div>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "400",
          color: "#363841",
          mb: "8px",
        }}
      >
        الأطراف
      </Typography>

      <Controller
        name="user"
        rules={{ required: true }}
        control={control}
        render={({ field }) => {
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: "18px 15px",
                boxShadow: "0px 4px 19px 0px #4548520A",
                backgroundColor: "#fff",
                borderRadius: "4px",
              }}
            >
              <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {usersConfig.map((item: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        cursor: "pointer",
                        flexShrink: 0,
                        padding: "8px 20px",
                        backgroundColor:
                          field.value === item ? "#077C5A" : "#F5F8FA",
                        color: field.value === item ? "#fff" : "#617696",
                        fontSize: "12px",
                        fontWeight: "400",
                        borderRadius: "8px",
                      }}
                      onClick={() => field.onChange(item)}
                    >
                      {item}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        }}
      />
    </div>
  );
}
