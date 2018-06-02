import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ProductSelect from "./ProductSelect";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  empty: theme.mixins.gutters({
    textAlign: "center",
    marginTop: theme.spacing.unit * 4
  }),
  progress: {
    margin: theme.spacing.unit * 4,
    display: "flex",
    justifyContent: "center"
  },
  productSelect: theme.mixins.gutters({})
});

const BoxList = ({
  classes,
  isLoading,
  boxes,
  products,
  selectedProductFilter,
  onChangeProductFilter
}) => {
  const getProduct = id => {
    const result = products.filter(product => product.id === id);
    if (result[0]) {
      return result[0];
    }
    return {
      category: "[none]",
      name: "[none]"
    };
  };

  let list;

  if (isLoading) {
    list = (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    );
  } else if (!boxes.length) {
    list = (
      <Typography className={classes.empty} variant="body1">
        No boxes. Make some?
      </Typography>
    );
  } else {
    list = (
      <List>
        <Divider />
        {boxes.map(box => (
          <React.Fragment key={box.id}>
            <ListItem>
              <ListItemText
                primary={`${box.quantity}x ${
                  getProduct(box.product.id).category
                } / ${getProduct(box.product.id).name}`}
                secondary={box.comment ? box.comment : " "}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.productSelect}>
        <ProductSelect
          products={products}
          value={selectedProductFilter}
          onChange={onChangeProductFilter}
        />
      </div>
      <br />
      {list}
    </div>
  );
};

export default withStyles(styles)(BoxList);