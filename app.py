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

from numpy import asarray
from numpy.random import randint
from numpy import linspace
from PIL import Image
import PIL
from matplotlib.pyplot import imsave
from matplotlib.pyplot import cm
import io
import imageio
import os
import shutil


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
            
        # gif method
        def make_gif():
            # generate points in latent space as input for the generator
            def generate_latent_points(latent_dim, n_samples, n_classes=10):
                # generate points in the latent space
                x_input = randn(latent_dim * n_samples)
                # reshape into a batch of inputs for the network
                z_input = x_input.reshape(n_samples, latent_dim)
                return z_input

            # uniform interpolation between two points in latent space


            def interpolate_points(p1, p2, n_steps):
                # interpolate ratios between the points
                ratios = linspace(0, 1, num=n_steps)
                # linear interpolate vectors
                vectors = list()
                for ratio in ratios:
                    v = (1.0 - ratio) * p1 + ratio * p2
                    vectors.append(v)
                return asarray(vectors)

            # create a plot of generated images
            size = 128

            def plot_generated(examples, n):
                # plot images
                for i in range(n):
                    # define subplot
                    pyplot.subplot(1, n, 1 + i)
                    # turn off axis
                    pyplot.axis('off')
                    # plot raw pixel data
                    img= np.zeros((size,size))
                    for j in range(size):
                        for k in range(size):
                            img[j,k] = examples[i,j,k,0]

                    pyplot.imshow(img, 'gray')
                    
                    imsave("images_gif/image_%d.png" % i, img)
                    Image.open("images_gif/image_%d.png" % i).convert('L').save("images_gif/imageg_%d.png" % i)
                    os.remove("images_gif/image_%d.png" % i)

            def save_gif():
                 # selecting file path
                filePath, _ = QFileDialog.getSaveFileName(self, "Save GIF", "",
                                "GIF(*.gif);;All Files(*.*) ")
        
                # if file path is blank return back
                if filePath == "":
                    return
                with imageio.get_writer(filePath, mode='I') as writer:
                    for i in range (100):
                        image = imageio.imread('images_gif/imageg_'+ str(i) + '.png')
                        writer.append_data(image)
                        
            os.mkdir("images_gif")            
            # load model
            model = load_model('generator.h5')
            # generate points in latent space
            pts = generate_latent_points(100, 100)
            print(pts.shape)
            # interpolate points in latent space
            interpolated = interpolate_points(pts[0], pts[99],100)
            # generate images
            X = model.predict(interpolated)
            # scale from [-1,1] to [0,1]
            X = (X + 1) / 2.0
            # plot the result
            plot_generated(X, len(interpolated))
            save_gif()
            shutil.rmtree('images_gif', ignore_errors=True)


            
            
            
            
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
        
        make_gif_btn = QPushButton("Make GIF")
        make_gif_btn.clicked.connect(make_gif)
        button_layout.addWidget(make_gif_btn)
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
