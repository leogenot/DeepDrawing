import numpy as np
import sys
from PyQt5 import QtWidgets
from matplotlib.backends.backend_qt5agg import FigureCanvas
from matplotlib.figure import Figure
from tensorflow.keras.models import load_model
from numpy.random import randn
from matplotlib import pyplot
from PIL import ImageGrab
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import * 
from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import (
    QApplication,
    QHBoxLayout,
    QLabel,
    QMainWindow,
    QPushButton,
    QStackedLayout,
    QVBoxLayout,
    QWidget,
)


class MainWindow(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        
                # generate points in latent space as input for the generator
        def generate_latent_points(latent_dim, n_samples):
            # generate points in the latent space
            x_input = randn(latent_dim * n_samples)
            # reshape into a batch of inputs for the network
            x_input = x_input.reshape(n_samples, latent_dim)
            return x_input


        # load model
        model = load_model("generator.h5")
        

        self.figure = Figure(figsize=(5, 3))
        self.canvas = FigureCanvas(self.figure)
        
        def create_plot():
            self.canvas.draw_idle()
                # generate images
            latent_points = generate_latent_points(100, 100)
            # generate images
            X = model.predict(latent_points)
            # scale from [-1,1] to [0,1]
            X = (X + 1) / 2.0
            
            for i in range(1 * 1):
                    self.ax = self.figure.subplots(1, 1 + i)
                    self.ax.set_axis_off()
                    self.ax.imshow(X[i, :], cmap="gray")

        # save method
        def save():
            
            # selecting file path
            filePath, _ = QFileDialog.getSaveFileName(self, "Save Image", "",
                            "PNG(*.png);;JPEG(*.jpg *.jpeg);;All Files(*.*) ")
    
            # if file path is blank return back
            if filePath == "":
                return
            
            
            screen = QtWidgets.QApplication.primaryScreen()
            screenshot = screen.grabWindow( w.winId() )
            screenshot.save(filePath)
            
        self.setWindowTitle("Deep Drawing Generation")

        pagelayout = QVBoxLayout()
        button_layout = QHBoxLayout()
        self.stacklayout = QStackedLayout()

        pagelayout.addLayout(button_layout)
        pagelayout.addLayout(self.stacklayout)

        generate_btn = QPushButton("Generate image")
        generate_btn.clicked.connect(create_plot)
        button_layout.addWidget(generate_btn)
        
        save_btn = QPushButton("Save image")
        save_btn.clicked.connect(save)
        button_layout.addWidget(save_btn)
        self.stacklayout.addWidget(self.canvas)

        widget = QWidget()
        widget.setLayout(pagelayout)
        self.setCentralWidget(widget)
        


    

if __name__ == "__main__":
    import sys

    app = QtWidgets.QApplication(sys.argv)
    w = MainWindow()
    w.resize(640, 480)
    w.show()

    sys.exit(app.exec_())
