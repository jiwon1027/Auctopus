package com.auctopus.project.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.auctopus.project.db.repository.UserRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class S3FileService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    AmazonS3Client amazonS3Client;

    public List<String> uploadAuctionImage(List<MultipartFile> multipartFiles, int auctionSeq) throws Exception {
        List<String> imagePathList = new ArrayList<>();
        for (MultipartFile multipartFile :multipartFiles) {
            String originalName = createFileName(multipartFile.getOriginalFilename());
            long size = multipartFile.getSize();

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(multipartFile.getContentType());
            objectMetadata.setContentLength(size);
            System.out.println(bucket);
            amazonS3Client.putObject(
                    new PutObjectRequest(bucket + "/auction/" + auctionSeq, originalName, multipartFile.getInputStream(), objectMetadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead));
            String imagePath = amazonS3Client.getUrl(bucket + "/auction/" + auctionSeq, originalName).toString();
            imagePathList.add(imagePath);
        }
        return imagePathList;
    }

    public void deleteFileName(String fileName) {
        String file = fileName.substring(52);
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, file));
    }

    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFilenameExtension(fileName));
    }

    private String getFilenameExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 사진입니다.");
        }
    }
}
