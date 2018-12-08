package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import de.codeschluss.portal.components.images.organisation.OrganisationImageEntity;
import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.image.ImageService;

import java.io.IOException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.hateoas.Resource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrganisationControllerAddAndDeleteImagesTest {

  @Autowired
  private OrganisationController controller;

  @MockBean
  private ImageService imageService;

  @Test
  @WithUserDetails("super@user")
  @SuppressWarnings("unchecked")
  public void addAndDeleteImagesSuperUserOk() throws IOException {
    given(this.imageService.resize(Mockito.any())).willReturn("test".getBytes());
    String organisationId = "00000000-0000-0000-0008-100000000000";
    MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt",
        "text/plain", "test".getBytes());
    OrganisationImageEntity result = ((Resource<OrganisationImageEntity>) controller
        .addImage(organisationId, "test", multipartFile)
        .getBody()).getContent();
    
    controller.deleteImages(organisationId, result.getId());
    
    try {
      controller.readImages(organisationId);
      assertThat(false).isTrue();
    } catch (NotFoundException e) {
      assertThat(true).isTrue();
    }
  }
  
  @Test
  @WithUserDetails("admin@user")
  @SuppressWarnings("unchecked")
  public void addAndDeleteImagesOwnOrgaOk() throws IOException {
    given(this.imageService.resize(Mockito.any())).willReturn("test".getBytes());
    String organisationId = "00000000-0000-0000-0008-100000000000";
    MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt",
        "text/plain", "test".getBytes());
    OrganisationImageEntity result = ((Resource<OrganisationImageEntity>) controller
        .addImage(organisationId, "test", multipartFile)
        .getBody()).getContent();
    
    controller.deleteImages(organisationId, result.getId());
    
    try {
      controller.readImages(organisationId);
      assertThat(false).isTrue();
    } catch (NotFoundException e) {
      assertThat(true).isTrue();
    }
  }
  
  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  @SuppressWarnings("unchecked")
  public void addAndFindImagesOtherOrgaDenied() throws IOException {
    given(this.imageService.resize(Mockito.any())).willReturn("test".getBytes());
    String organisationId = "00000000-0000-0000-0008-100000000000";
    MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt",
        "text/plain", "test".getBytes());
    OrganisationImageEntity result = ((Resource<OrganisationImageEntity>) controller
        .addImage(organisationId, "test", multipartFile)
        .getBody()).getContent();
    
    controller.deleteImages(organisationId, result.getId());
  }
  
  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  @SuppressWarnings("unchecked")
  public void addAndFindImagesNotRegisteredDenied() throws IOException {
    given(this.imageService.resize(Mockito.any())).willReturn("test".getBytes());
    String organisationId = "00000000-0000-0000-0008-100000000000";
    MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt",
        "text/plain", "test".getBytes());
    OrganisationImageEntity result = ((Resource<OrganisationImageEntity>) controller
        .addImage(organisationId, "test", multipartFile)
        .getBody()).getContent();
    
    controller.deleteImages(organisationId, result.getId());
  }
}
