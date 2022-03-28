
<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/leogenot/DeepDrawing">
    <img src="https://github.com/leogenot/DeepDrawing/blob/WGAN-GP/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Deep Drawing</h3>

  <p align="center">
    Unleash your creativity using AI
    <br />
    <a href="https://leogenot.github.io/DeepDrawing"><strong>Try yourself »</strong></a>
    <br /> <br />

</div>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#examples">Examples</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
  <a href="https://leogenot.github.io/DeepDrawing/">
    <img src="https://github.com/leogenot/DeepDrawing/blob/WGAN-GP/images/website.gif" alt="Demo">
  </a>
</div>
</Br>

Can an algorithm learn to draw? Since the DeepMind deep learning network won against the Go player Lee Sedol in 2016, it seems that any highly complex task can be invested by these computing techniques. Now, traditionally, drawing is a cognitive task that is complex because it combines the mind with the mastery of a gesture. From very large sets of drawings, GANs, new deep learning architectures, can generate realistic or convincing graphics. Other questions then arise: Can we create a program that is creative (or aids creativity)? And can we collaborate with it in order to invent new methods of creation? These are the questions that our project tries to answer.


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Tensorflow](https://www.tensorflow.org)
* [TensorflowJs](https://www.tensorflow.org/js)
* [Python](https://www.python.org)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

There are a few things to do first if you want to try the 'non web' version of our project

### Prerequisites

You will have to install some software in order to run our project:
* [Python](https://www.python.org)
* [Anaconda](https://www.anaconda.com)
* [VSCode](https://code.visualstudio.com) (Optional, you can use Anaconda if you prefer)

### Installation

Once everything above is set up you will have to run several commands in your terminal:

1. First we create a virtual environment:
 ```sh
   conda create --name NAMEOFYOURENVIRONMENT python=3.6
   ```
   
2. We then activate this new environment:
```sh
   conda activate NAMEOFYOURENVIRONMENT
   ```

3. Now you can either install pip dependencies by hand or you can write the following command in your terminal:
```sh
   pip install -r requirements.txt
   ```

4. If you prefer going by hand enter all this commands in your terminal:
```sh
pip install tensorflow-directml
```
```sh
pip install ipykernel
```
```sh
pip install notebook
```
```sh
pip install pydot
```
```sh
pip install matplotlib
```
```sh
pip install pandas
```
```sh
pip install imageio
```
```sh
pip install graphviz
```
```sh
pip install scipy
```
```sh
pip install pydot
```
```sh
pip install opencv-python
```
5. You can now run the notebook in your preferred IDE


### Run with Google Colab:

If you prefer using Google Colab to train the model:

1. Open the following link and run the notebook, everything is already set-up:
[Google Colab Notebook](https://colab.research.google.com/drive/1yAFerR1qAnF_E2ZQ98MfHUmXr6sG6JEe?usp=sharing)

   
2. Or create a notebook yourself and copy these commands:
```sh
!git clone 'https://github.com/leogenot/DeepDrawing/'
   ```
   ```sh
   %cd DeepDrawing
   ```
   3. Then copy and paste each cells of the [_wgan_gp.ipynb_](https://github.com/leogenot/DeepDrawing/blob/WGAN-GP/wgan_gp.ipynb) notebook by hand.
   
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- EXAMPLES -->
## Examples
<div align="center">
  <img src="https://github.com/leogenot/DeepDrawing/blob/WGAN-GP/images/sample_0.png" alt="Sample">
  <img src="https://github.com/leogenot/DeepDrawing/blob/WGAN-GP/images/gif.gif" alt="Gif1">
  <img src="https://github.com/leogenot/DeepDrawing/blob/WGAN-GP/images/gif2.gif" alt="Gif2">
  <img src="https://github.com/leogenot/DeepDrawing/blob/WGAN-GP/images/gif3.gif" alt="Gif3">
 </div>
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Léo Genot - [LinkedIn](https://www.linkedin.com/in/leo-genot/)</br>
Valentin Guiller - [LinkedIn]()</br>
Adam Ferreira - [LinkedIn](https://www.linkedin.com/in/ad-ferreira/)

Vincent Nozick - [LinkedIn](https://www.linkedin.com/in/vincent-nozick-8030132/)</br>
Gaëtan Robillard - [LinkedIn](https://www.linkedin.com/in/gaetanrobillard/)

IMAC engineering school - [Website](https://www.ingenieur-imac.fr)

Project Link: [Github](https://github.com/leogenot/DeepDrawing)</br>
Website Link: [Deep Drawing](https://leogenot.github.io/DeepDrawing)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Some ressources that were helpful for the project:

* [David Foster Book](https://www.amazon.fr/Generative-Deep-Learning-Teaching-Machines/dp/1492041947)
* [Keras Documentation](https://keras.io/api/)
* [Tensorflow Documentation](https://www.tensorflow.org)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: https://github.com/leogenot/DeepDrawing/blob/WGAN-GP/images/website.png
