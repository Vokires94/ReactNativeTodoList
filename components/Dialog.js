import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  Button,
} from "@react-native-material/core";

const DialogComponent = (props) => {

  return (
      <Dialog visible={props.open} onDismiss={props.close}>
        <DialogHeader title={props.title} />
        <DialogContent>
          <Text>
            {props.text}
          </Text>
        </DialogContent>
        <DialogActions>
          <Button
            title="Ok"
            compact
            variant="text"
            onPress={props.close}
          />
        </DialogActions>
      </Dialog>
  );
};

export default DialogComponent;