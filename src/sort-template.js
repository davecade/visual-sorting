sortName = () => {
    if(!this.state.sortRunning && this.state.graphGenerated) {
      this.playSortingSound();

      let sorted = this.checkSorted()

      if(!sorted) {
        let started = setInterval(()=>{



          if(sorted === true || this.state.stopClicked === true) {
            this.playFinishedSound();
            clearInterval(started)
            this.setState({sortRunning: false, stopClicked: false})
          }
        }, 50)
      }
    }
  }