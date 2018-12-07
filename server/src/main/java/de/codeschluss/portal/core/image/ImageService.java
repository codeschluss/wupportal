package de.codeschluss.portal.core.image;

import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * The Class ImageService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class ImageService {
  
  private final ImageConfiguration config;
  
  public ImageService(ImageConfiguration config) {
    this.config = config;
  }
  
  /**
   * Resize.
   *
   * @param imageFile the image file
   * @return the byte[]
   * @throws IOException Signals that an I/O exception has occurred.
   */
  public byte[] resize(MultipartFile imageFile) throws IOException {
    BufferedImage imageBuff = ImageIO.read(imageFile.getInputStream());
    imageBuff = Scalr.resize(
        imageBuff, Scalr.Method.ULTRA_QUALITY, config.getMaxWidth(), config.getMaxWidth());
    return ((DataBufferByte) imageBuff.getData().getDataBuffer()).getData();
  }
  
  
}
