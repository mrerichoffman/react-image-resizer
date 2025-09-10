import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  imgContainer: {
    position: 'relative',
    flex: 1,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 16,
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  button: {
    backgroundColor: '#3f51b5',
    color: 'white',
    padding: '8px 16px',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
}

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class ImgDialog extends React.Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  resizeImage = () => {
    if (!this.props.img) return

    // Create a temporary canvas and image
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Set canvas size to desired dimensions
      canvas.width = 240
      canvas.height = 240

      // Draw and resize the image
      ctx.drawImage(img, 0, 0, 240, 240)

      // Convert to PNG
      canvas.toBlob((blob) => {
        // Create download link
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'resized-image.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 'image/png')
    }

    img.src = this.props.img
  }

  render() {
    const { classes } = this.props
    return (
      <Dialog
        fullScreen
        open={!!this.props.img}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.props.onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Cropped image
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.imgContainer}>
          <img src={this.props.img} alt="Cropped" className={classes.img} />
          <Button
            variant="contained"
            color="primary"
            onClick={this.resizeImage}
            className={classes.button}
          >
            Download as 240x240 PNG
          </Button>
        </div>
      </Dialog>
    )
  }
}

export default withStyles(styles)(ImgDialog)
